export const D1_FREE_QUERY_LIMIT = 50;
export const D1_CAPTURE_STATEMENT_CEILING = 45;
export const D1_MAX_BOUND_PARAMETERS = 100;

export function d1RowsPerStatement(columnCount: number) {
  if (!Number.isInteger(columnCount) || columnCount < 1) {
    throw new Error("A D1 insert plan requires at least one column.");
  }
  return Math.max(1, Math.floor(D1_MAX_BOUND_PARAMETERS / columnCount));
}

export function d1InsertPlan(label: string, rowCount: number, columnCount: number) {
  if (!Number.isInteger(rowCount) || rowCount < 0) {
    throw new Error("A D1 insert plan requires a non-negative whole row count.");
  }
  const rowsPerStatement = d1RowsPerStatement(columnCount);
  return {
    label,
    statements: Math.ceil(rowCount / rowsPerStatement),
    maximumBoundParameters: Math.min(rowCount, rowsPerStatement) * columnCount,
  };
}

export function worstCaseSearchCapturePlan() {
  const items = [
    { label: "begin run insert", statements: 1, maximumBoundParameters: 12 },
    { label: "begin run read", statements: 1, maximumBoundParameters: 1 },
  ];

  for (const role of ["current", "previous"]) {
    items.push(
      { label: `${role} snapshot`, statements: 1, maximumBoundParameters: 22 },
      d1InsertPlan(`${role} daily rows`, 90, 6),
      d1InsertPlan(`${role} query rows`, 50, 8),
      d1InsertPlan(`${role} page rows`, 50, 10),
      d1InsertPlan(`${role} device rows`, 3, 6),
    );
  }

  items.push(
    d1InsertPlan("provider warnings", 40, 5),
    { label: "complete run update", statements: 1, maximumBoundParameters: 10 },
  );

  return {
    items,
    totalStatements: items.reduce((total, item) => total + item.statements, 0),
    maximumBoundParameters: Math.max(...items.map((item) => item.maximumBoundParameters)),
  };
}

export function assertD1CapturePlan(plan = worstCaseSearchCapturePlan()) {
  if (plan.totalStatements > D1_CAPTURE_STATEMENT_CEILING) {
    throw new Error(
      `The planned D1 capture uses ${plan.totalStatements} statements; the safety ceiling is ${D1_CAPTURE_STATEMENT_CEILING}.`,
    );
  }
  if (plan.maximumBoundParameters > D1_MAX_BOUND_PARAMETERS) {
    throw new Error(
      `A planned D1 statement uses ${plan.maximumBoundParameters} bound parameters; the platform limit is ${D1_MAX_BOUND_PARAMETERS}.`,
    );
  }
  return plan;
}
