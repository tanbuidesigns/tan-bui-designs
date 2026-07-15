import type { Metadata } from "next";
import Link from "next/link";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import WideShell from "@/components/ui/WideShell";

export const metadata: Metadata = {
  title: "Privacy notice | Tan Bui Designs",
  description: "How Tan Bui Designs collects, uses and protects personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="overflow-x-clip bg-white text-black">
      <section className="border-b border-black/8 bg-[#f4f4f1] py-14 sm:py-18 lg:py-20">
        <WideShell>
          <AnimatedLabel className="mb-5">Privacy</AnimatedLabel>
          <AnimatedHeadline as="h1" className="max-w-5xl text-5xl sm:text-6xl lg:text-7xl">
            Privacy notice
          </AnimatedHeadline>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-gray-600">
            This draft explains what personal information Tan Bui Designs handles through this website and how it is used.
          </p>
        </WideShell>
      </section>

      <WideShell className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,48rem)] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.1rem] border border-amber-300/45 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
              <strong className="block">Owner review needed</strong>
              Confirm the final retention schedule, Cloudflare and Resend account terms, international-transfer safeguards, and whether any production cookies or analytics are enabled before treating this as final legal copy.
            </div>
            <p className="mt-5 text-sm text-gray-500">Last updated: 14 July 2026</p>
          </aside>

          <div className="space-y-12 text-base leading-relaxed text-gray-700 sm:text-lg">
            <NoticeSection title="Who is responsible for your information">
              <p>Tan Bui Designs is the data controller for personal information collected through this website.</p>
              <p>For privacy questions or requests, email <a href="mailto:tanbuidesigns@gmail.com" className="text-black underline underline-offset-4">tanbuidesigns@gmail.com</a>.</p>
            </NoticeSection>

            <NoticeSection title="Information collected">
              <p>If you use the contact form, the site collects your name, email address, selected service interests and the message you submit. If you contact Tan Bui Designs another way, the information you choose to include may also be handled.</p>
              <p>The hosting and security infrastructure may process technical request information such as IP address, device or browser details, requested pages, timestamps and diagnostic or security events.</p>
            </NoticeSection>

            <NoticeSection title="Why the information is used">
              <ul>
                <li>To read and respond to enquiries and discuss possible work.</li>
                <li>To take steps you request before entering into a contract, or to manage a client relationship.</li>
                <li>To operate, protect and diagnose the website.</li>
                <li>To keep records where required for legal, tax, accounting or dispute purposes.</li>
              </ul>
              <p>The likely lawful bases are steps taken at your request before a contract, performance of a contract, legitimate interests in responding to genuine enquiries and operating a secure website, and legal obligations where records must be kept. Tan Bui Designs does not use contact-form details for unrelated marketing without an appropriate basis.</p>
            </NoticeSection>

            <NoticeSection title="Service providers and sharing">
              <p>The website is hosted using Cloudflare infrastructure. Contact-form submissions are sent using Resend and delivered to the Tan Bui Designs email account. These providers may process information on behalf of Tan Bui Designs under their own service and data-protection terms.</p>
              <p>Information may also be disclosed where required by law, to establish or defend legal rights, or to professional advisers who need it for their work. Personal information is not sold.</p>
            </NoticeSection>

            <NoticeSection title="International processing">
              <p>Cloudflare, Resend and email infrastructure may process information in the UK or other countries. Where personal information is transferred internationally, an appropriate legal transfer mechanism and safeguards should be used. The precise account regions and contractual safeguards need to be confirmed by the site owner before this notice is final.</p>
            </NoticeSection>

            <NoticeSection title="Retention">
              <p>Enquiry information is kept only for as long as reasonably needed to respond, follow up and administer the relationship. If an enquiry becomes client work, relevant correspondence and records may be retained longer where needed for contractual, tax, accounting or legal purposes. Unsuccessful or inactive enquiries should be deleted when they are no longer useful, subject to any reason they must be preserved.</p>
              <p>A fixed retention schedule has not been confirmed and must be set by the site owner.</p>
            </NoticeSection>

            <NoticeSection title="Cookies and similar technologies">
              <p>The application code currently has no optional advertising, marketing or audience-analytics service configured. Cloudflare or another essential service may use limited storage or technical mechanisms for security, load balancing or delivery when necessary.</p>
              <p>If optional analytics, embedded media or other non-essential storage is added, this notice and the site&apos;s consent controls must be reviewed before it is enabled.</p>
            </NoticeSection>

            <NoticeSection title="External links and content">
              <p>The site links to third-party websites, including LinkedIn and sources referenced in blog articles. Their own privacy notices apply when you follow those links. The repository includes support for embedded case-study media, but any live third-party embed should be checked for data collection and cookies before publication.</p>
            </NoticeSection>

            <NoticeSection title="Security">
              <p>Reasonable technical and organisational measures are used to protect personal information. No website or email system can guarantee absolute security, so only send information that is relevant to your enquiry and avoid including sensitive personal information unless it is genuinely necessary.</p>
            </NoticeSection>

            <NoticeSection title="Your rights">
              <p>Depending on the circumstances, UK data-protection law may give you rights to access, correct or erase your information; restrict or object to its use; and receive certain information in a portable form. You may also withdraw consent where consent is the basis used. These rights are not absolute and the applicable lawful basis can affect them.</p>
              <p>To make a request, email Tan Bui Designs using the address above. You can also complain to the <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-4">Information Commissioner&apos;s Office</a>. It is usually helpful to contact Tan Bui Designs first so the concern can be investigated.</p>
            </NoticeSection>

            <NoticeSection title="Changes to this notice">
              <p>This notice may be updated when the website, service providers or legal requirements change. The date at the top will show the latest revision.</p>
              <p><Link href="/contact" className="text-black underline underline-offset-4">Contact Tan Bui Designs</Link> if anything here is unclear.</p>
            </NoticeSection>
          </div>
        </div>
      </WideShell>
    </main>
  );
}

function NoticeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-[-0.035em] text-black sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 [&_li]:ml-5 [&_li]:list-disc [&_li+li]:mt-2">{children}</div>
    </section>
  );
}
