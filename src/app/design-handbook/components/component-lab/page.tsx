"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedStroke from "@/components/ui/AnimatedStroke";

const gradient = "var(--tbds-accent-gradient)";
const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function ComponentLabPage() {
  const [strokeActive, setStrokeActive] = useState(false);
  const [quoteActive, setQuoteActive] = useState(false);
  const [progressActive, setProgressActive] = useState(false);
  const [activeCard, setActiveCard] = useState<"previous" | "next" | null>(
    null
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#000000",
        padding: "clamp(32px, 7vw, 80px)",
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
            maxWidth: "900px",
            fontSize: "clamp(48px, 8vw, 82px)",
            lineHeight: "0.95",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            marginBottom: "32px",
          }}
        >
          Raw motion tests before they become system patterns.
        </h1>

        <p
          style={{
            maxWidth: "720px",
            fontSize: "20px",
            lineHeight: "1.6",
            color: "#666666",
            marginBottom: "72px",
          }}
        >
          This page is for testing animation, gradient behaviour, hover motion
          and small visual primitives before promoting anything into the main
          TBDS system.
        </p>

        <div
          style={{
            display: "grid",
            gap: "56px",
            borderTop: "1px solid #eeeeee",
            paddingTop: "56px",
          }}
        >
          <LabGroup
            number="01"
            title="Foundation checks"
            description="Basic rendering checks for solid colour, hardcoded gradient and the TBDS gradient token."
          >
            <div
              style={{
                display: "grid",
                gap: "24px",
              }}
            >
              <Bar label="Solid black bar" background="#000000" />
              <Bar
                label="Hardcoded gradient bar"
                background="linear-gradient(90deg, #6366f1, #e82e7e, #facc15)"
              />
              <Bar
                label="TBDS gradient token"
                background="var(--tbds-accent-gradient)"
              />
            </div>
          </LabGroup>

          <LabGroup
            number="02"
            title="AnimatedLabel"
            description="Used for small uppercase labels where the letters animate in with a crafted editorial feel."
          >
            <div
              style={{
                border: "1px solid #eeeeee",
                padding: "32px",
              }}
            >
              <AnimatedLabel>COMPONENT LAB</AnimatedLabel>

              <p
                style={{
                  marginTop: "24px",
                  maxWidth: "620px",
                  fontSize: "18px",
                  lineHeight: "1.6",
                  color: "#666666",
                }}
              >
                This is best for short labels only. Long labels should be solved
                through better content hierarchy, not forced wrapping.
              </p>
            </div>
          </LabGroup>

          <LabGroup
            number="03"
            title="AnimatedHeadline"
            description="Used for large editorial statements where the words need a subtle reveal effect."
          >
            <div
              style={{
                border: "1px solid #eeeeee",
                padding: "32px",
              }}
            >
              <h2
                style={{
                  maxWidth: "820px",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  lineHeight: "0.95",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  margin: 0,
                }}
              >
                <AnimatedHeadline>
                  Motion should support the story, not decorate it.
                </AnimatedHeadline>
              </h2>
            </div>
          </LabGroup>

          <LabGroup
            number="04"
            title="Reveal"
            description="Used for entrance rhythm. The reveal should feel calm, not flashy."
          >
            <div
              style={{
                border: "1px solid #eeeeee",
                padding: "32px",
              }}
            >
              <Reveal>
                <div
                  style={{
                    maxWidth: "720px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      lineHeight: "1.25",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    This block is wrapped in Reveal.
                  </p>

                  <p
                    style={{
                      marginTop: "16px",
                      marginBottom: 0,
                      fontSize: "18px",
                      lineHeight: "1.6",
                      color: "#666666",
                    }}
                  >
                    It is useful for section entrances and long-form case study
                    pacing.
                  </p>
                </div>
              </Reveal>
            </div>
          </LabGroup>

          <LabGroup
            number="05"
            title="AnimatedStroke"
            description="Reusable TBDS gradient stroke primitive. Hover the area to test left and right alignment."
          >
            <div
              onMouseEnter={() => setStrokeActive(true)}
              onMouseLeave={() => setStrokeActive(false)}
              style={{
                border: "1px solid #eeeeee",
                padding: "32px",
                cursor: "default",
              }}
            >
              <AnimatedStroke active={strokeActive} />

              <p
                style={{
                  marginTop: "32px",
                  marginBottom: "32px",
                  maxWidth: "700px",
                  fontSize: "18px",
                  lineHeight: "1.6",
                  color: "#666666",
                }}
              >
                This is the reusable stroke used for subtle editorial motion.
                It should stay small, controlled and used only where it adds
                focus.
              </p>

              <AnimatedStroke active={strokeActive} align="right" />
            </div>
          </LabGroup>

          <LabGroup
            number="06"
            title="Quote motion composition"
            description="A lab version of the quote treatment using AnimatedHeadline plus top and bottom gradient strokes."
          >
            <div
              onMouseEnter={() => setQuoteActive(true)}
              onMouseLeave={() => setQuoteActive(false)}
              style={{
                borderTop: "1px solid #eeeeee",
                borderBottom: "1px solid #eeeeee",
                padding: "56px 0",
                cursor: "default",
              }}
            >
              <AnimatedStroke active={quoteActive} />

              <blockquote
                style={{
                  maxWidth: "900px",
                  margin: "48px 0 0",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  lineHeight: "0.98",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  transform: quoteActive
                    ? "translateY(-4px)"
                    : "translateY(0)",
                  transition: `transform 700ms ${ease}`,
                }}
              >
                <span style={{ color: "#cccccc" }}>“</span>
                <AnimatedHeadline className="inline">
                  A component is not finished just because it renders.
                </AnimatedHeadline>
                <span style={{ color: "#cccccc" }}>”</span>
              </blockquote>

              <p
                style={{
                  marginTop: "32px",
                  marginBottom: 0,
                  fontSize: "18px",
                  color: quoteActive ? "#374151" : "#6b7280",
                  transform: quoteActive
                    ? "translateX(8px)"
                    : "translateX(0)",
                  transition: `transform 300ms ${ease}, color 300ms ease`,
                }}
              >
                Case study principle
              </p>

              <div style={{ marginTop: "48px" }}>
                <AnimatedStroke active={quoteActive} align="right" />
              </div>
            </div>
          </LabGroup>

          <LabGroup
            number="07"
            title="Centre-out gradient stroke"
            description="This is the motion pattern now used on previous and next case study cards."
          >
            <div
              style={{
                display: "grid",
                gap: "24px",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              <MotionCard
                direction="previous"
                title="Previous Project"
                active={activeCard === "previous"}
                onMouseEnter={() => setActiveCard("previous")}
                onMouseLeave={() => setActiveCard(null)}
              />

              <MotionCard
                direction="next"
                title="Next Project"
                active={activeCard === "next"}
                onMouseEnter={() => setActiveCard("next")}
                onMouseLeave={() => setActiveCard(null)}
              />
            </div>
          </LabGroup>

          <LabGroup
            number="08"
            title="Progress motion pattern"
            description="A lab version of the reading progress and active progress navigation behaviour."
          >
            <div
              onMouseEnter={() => setProgressActive(true)}
              onMouseLeave={() => setProgressActive(false)}
              style={{
                border: "1px solid #eeeeee",
                padding: "32px",
                cursor: "default",
              }}
            >
              <p
                style={{
                  marginTop: 0,
                  marginBottom: "16px",
                  fontSize: "14px",
                  color: "#666666",
                }}
              >
                Hover to simulate progress movement.
              </p>

              <div
                style={{
                  height: "3px",
                  width: "100%",
                  background: "#eeeeee",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: progressActive ? "74%" : "28%",
                    background: gradient,
                    transition: `width 700ms ${ease}`,
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "32px",
                }}
              >
                <ProgressPill label="Hero" active />
                <ProgressPill label="Overview" active={progressActive} />
                <ProgressPill label="Results" active={false} />
              </div>
            </div>
          </LabGroup>
        </div>
      </section>
    </main>
  );
}

function LabGroup({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div
        style={{
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "minmax(0, 0.35fr) minmax(0, 1fr)",
          marginBottom: "28px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "#999999",
            }}
          >
            Test {number}
          </p>
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "32px",
              lineHeight: "1.05",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              maxWidth: "680px",
              marginTop: "12px",
              marginBottom: 0,
              fontSize: "17px",
              lineHeight: "1.6",
              color: "#666666",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Bar({
  label,
  background,
}: {
  label: string;
  background: string;
}) {
  return (
    <div>
      <p
        style={{
          marginTop: 0,
          marginBottom: "10px",
          fontSize: "14px",
          color: "#666666",
        }}
      >
        {label}
      </p>

      <div
        style={{
          display: "block",
          width: "min(420px, 100%)",
          height: "16px",
          background,
        }}
      />
    </div>
  );
}

function MotionCard({
  direction,
  title,
  active,
  onMouseEnter,
  onMouseLeave,
}: {
  direction: "previous" | "next";
  title: string;
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const isNext = direction === "next";

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid",
        borderColor: active ? "#d1d5db" : "#e5e7eb",
        padding: "32px",
        minHeight: "230px",
        textAlign: isNext ? "right" : "left",
        transform: active ? "translateY(-4px)" : "translateY(0)",
        boxShadow: active ? "0 18px 45px rgba(0,0,0,0.06)" : "none",
        transition: `transform 500ms ${ease}, border-color 500ms ${ease}, box-shadow 500ms ${ease}`,
        cursor: "default",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "100%",
          height: "3px",
          background: gradient,
          transform: active
            ? "translateX(-50%) scaleX(1)"
            : "translateX(-50%) scaleX(0)",
          transformOrigin: "center",
          transition: `transform 700ms ${ease}`,
        }}
      />

      <p
        style={{
          marginTop: 0,
          marginBottom: "18px",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          color: "#777777",
        }}
      >
        {isNext ? "Next Project" : "Previous Project"}
      </p>

      <h3
        style={{
          maxWidth: isNext ? "none" : "320px",
          marginTop: 0,
          marginBottom: "18px",
          marginLeft: isNext ? "auto" : 0,
          fontSize: "32px",
          lineHeight: "1",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: active ? "#374151" : "#000000",
          transition: "color 300ms ease",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#6b7280",
          fontSize: "16px",
        }}
      >
        Case study motion pattern
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isNext ? "flex-end" : "flex-start",
          gap: "8px",
          marginTop: "40px",
          fontSize: "14px",
          color: active ? "#000000" : "#6b7280",
          transform: active
            ? isNext
              ? "translateX(8px)"
              : "translateX(-8px)"
            : "translateX(0)",
          transition: `transform 300ms ${ease}, color 300ms ease`,
        }}
      >
        {!isNext && (
          <span
            style={{
              display: "inline-block",
              transform: active ? "translateX(-4px)" : "translateX(0)",
              transition: `transform 300ms ${ease}`,
            }}
          >
            ←
          </span>
        )}

        <span>View Project</span>

        {isNext && (
          <span
            style={{
              display: "inline-block",
              transform: active ? "translateX(4px)" : "translateX(0)",
              transition: `transform 300ms ${ease}`,
            }}
          >
            →
          </span>
        )}
      </div>
    </div>
  );
}

function ProgressPill({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        border: "1px solid",
        borderColor: active ? "transparent" : "#e5e7eb",
        borderRadius: "999px",
        padding: "8px 12px",
        background: active ? gradient : "#ffffff",
        color: active ? "#000000" : "#6b7280",
        fontSize: "13px",
        transition:
          "background 300ms ease, color 300ms ease, border-color 300ms ease",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "999px",
          background: active ? "#000000" : "#d1d5db",
        }}
      />

      <span>{label}</span>
    </div>
  );
}