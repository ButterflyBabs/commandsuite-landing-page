import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { currentSession } from "../sessions";
import WelcomeClient from "./WelcomeClient";

// The welcome screen Babs shares in Zoom while the room fills: a gold-and-indigo stage with a ten-minute
// countdown to the next session. Open /masterclass/welcome 10+ minutes early and share the browser tab.
// For a rehearsal, add ?in=600 (counts down from ten minutes) or ?in=20 (see the "beginning" screen).
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Welcome | The Command Shift MasterClass",
  robots: { index: false, follow: false },
};

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--w-serif" });
const sans = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--w-sans" });

export default function WelcomePage() {
  const s = currentSession();
  return (
    <div className={`${serif.variable} ${sans.variable}`}>
      <WelcomeClient startMs={s ? s.startMs : null} timeLabel={s ? s.time : "12:00 PM Mountain Time"} />
    </div>
  );
}
