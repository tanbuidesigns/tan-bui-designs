export default function ComponentLabPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#000000",
        padding: "80px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p
          style={{
            marginBottom: "24px",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "#666666",
          }}
        >
          Component Lab
        </p>

        <h1
          style={{
            maxWidth: "850px",
            fontSize: "64px",
            lineHeight: "0.95",
            fontWeight: 700,
            marginBottom: "64px",
          }}
        >
          Raw visual tests.
        </h1>

        <div
          style={{
            display: "grid",
            gap: "48px",
            borderTop: "1px solid #eeeeee",
            paddingTop: "48px",
          }}
        >
          {/* TEST 1 */}
          <div>
            <p style={{ marginBottom: "12px" }}>
              Test 1: solid red bar. If this does not show, the element is not
              rendering.
            </p>

            <div
              style={{
                display: "block",
                width: "300px",
                height: "20px",
                background: "red",
              }}
            />
          </div>

          {/* TEST 2 */}
          <div>
            <p style={{ marginBottom: "12px" }}>
              Test 2: solid black bar.
            </p>

            <div
              style={{
                display: "block",
                width: "300px",
                height: "20px",
                background: "black",
              }}
            />
          </div>

          {/* TEST 3 */}
          <div>
            <p style={{ marginBottom: "12px" }}>
              Test 3: hardcoded gradient bar.
            </p>

            <div
              style={{
                display: "block",
                width: "300px",
                height: "20px",
                background:
                  "linear-gradient(90deg, #6366f1, #e82e7e, #facc15)",
              }}
            />
          </div>

          {/* TEST 4 */}
          <div>
            <p style={{ marginBottom: "12px" }}>
              Test 4: TBDS gradient variable.
            </p>

            <div
              style={{
                display: "block",
                width: "300px",
                height: "20px",
                background: "var(--tbds-accent-gradient)",
              }}
            />
          </div>

          {/* TEST 5 */}
          <div
            style={{
              border: "1px solid #dddddd",
              padding: "32px",
            }}
          >
            <p style={{ marginBottom: "12px" }}>
              Test 5: quote-style section with hardcoded gradient lines.
            </p>

            <div
              style={{
                width: "180px",
                height: "8px",
                borderRadius: "999px",
                background:
                  "linear-gradient(90deg, #6366f1, #e82e7e, #facc15)",
                marginBottom: "40px",
              }}
            />

            <blockquote
              style={{
                fontSize: "48px",
                lineHeight: "1.05",
                fontWeight: 700,
                maxWidth: "900px",
                margin: 0,
              }}
            >
              <span style={{ color: "#cccccc" }}>“</span>
              This is a raw quote test with visible gradient strokes.
              <span style={{ color: "#cccccc" }}>”</span>
            </blockquote>

            <div
              style={{
                width: "180px",
                height: "8px",
                borderRadius: "999px",
                background:
                  "linear-gradient(90deg, #6366f1, #e82e7e, #facc15)",
                marginTop: "40px",
                marginLeft: "auto",
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}