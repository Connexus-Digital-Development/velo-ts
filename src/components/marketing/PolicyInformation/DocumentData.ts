
import Policy_Wording_Booklet_Web_March15 from "@/assets/documents/Policy_Wording_Booklet_Web_March15.pdf";
import VELO002CoreCycleInsurancePolicySchedule from "@/assets/documents/VELO205 - CORE Velosure Insurance Product Information Document (IPID) TM V4.pdf";
import VELO002CycleInsurancePolicySchedule from "@/assets/documents/VELO205 - Velosure Insurance Product Information Document (IPID) TM V4.pdf";
import TOBv3 from "@/assets/documents/VELO207.-.Velosure.Terms.of.Business.TM.V3.pdf";
import cycleRescueIpid1stJan2025 from "@/assets/documents/Velosure.Cycle.Policy.IPID.pdf";
import Policy_Wording_Booklet_Web_jan25 from "@/assets/documents/Velosure.Policy.Wording.January.2025.pdf";
import Policy_Wording_Booklet_Web_Feb_2026 from "@/assets/documents/15368.-.Chubb.Velosure.Dual.Branded.Policy.Wording.digital.-.February.2026.pdf";
import VELO002CoreCycleInsurancePolicySchedule2025 from "@/assets/documents/VELO205.-.Chubb.CORE.Velosure.IPID.pdf";
import VELO002PerfCycleInsurancePolicySchedule2025 from "@/assets/documents/VELO205.-.Chubb.Performance.Velosure.IPID.pdf";
import Policy_Wording_Booklet_Web_2025 from "@/assets/documents/VELO206.-.Chubb.Velosure.Policy.Wording.digital.pdf";
import TOBv4 from "@/assets/documents/VELO207 - Chubb Velosure Terms of Business.pdf";
import TOBv5 from "@/assets/documents/VELO207.-.Velosure.Chubb.Terms.of.Business.pdf";
const DocumentData = () => {
  return {
    DocumentList: [
      {
        id: 0,
        header: "Velosure policies purchased on or after 17th February 2026",
        docs: [
          {
            title: "Velosure Performance Insurance Product",
            key: 0,
            url: `${VELO002PerfCycleInsurancePolicySchedule2025}`,
          },
          {
            title: "Velosure Core Insurance Product",
            key: 1,
            url: `${VELO002CoreCycleInsurancePolicySchedule2025}`,
          },
          {
            title: "Velosure Policy Wording",
            key: 2,
            url: `${Policy_Wording_Booklet_Web_Feb_2026}`,
          },
          {
            title: "Cycle Rescue Insurance Product",
            key: 3,
            url: `${cycleRescueIpid1stJan2025}`,
          },
          {
            title: "Cycle Rescue Policy Wording",
            key: 4,
            url: `${Policy_Wording_Booklet_Web_jan25}`,
          },
          {
            title: "Terms of Business",
            key: 5,
            url: `${TOBv5}`,
          },
        ],
      },
      {
        id: 1,
        header: "Velosure policies purchased between 8th December 2025 and 16th February 2026",
        docs: [
          {
            title: "Velosure Performance Insurance Product",
            key: 0,
            url: `${VELO002PerfCycleInsurancePolicySchedule2025}`,
          },
          {
            title: "Velosure Core Insurance Product",
            key: 1,
            url: `${VELO002CoreCycleInsurancePolicySchedule2025}`,
          },
          {
            title: "Velosure Policy Wording",
            key: 2,
            url: `${Policy_Wording_Booklet_Web_2025}`,
          },
          {
            title: "Cycle Rescue Insurance Product",
            key: 3,
            url: `${cycleRescueIpid1stJan2025}`,
          },
          {
            title: "Cycle Rescue Policy Wording",
            key: 4,
            url: `${Policy_Wording_Booklet_Web_jan25}`,
          },
          {
            title: "Terms of Business",
            key: 5,
            url: `${TOBv5}`,
          },
        ],
      },
      {
        id: 2,
        header: "Velosure policies purchased between 1st June 2025 and 7th December 2025",
        docs: [
          {
            title: "Velosure Performance Insurance Product",
            key: 0,
            url: `${VELO002PerfCycleInsurancePolicySchedule2025}`,
          },
          {
            title: "Velosure Core Insurance Product",
            key: 1,
            url: `${VELO002CoreCycleInsurancePolicySchedule2025}`,
          },
          {
            title: "Velosure Policy Wording",
            key: 2,
            url: `${Policy_Wording_Booklet_Web_2025}`,
          },
          {
            title: "Cycle Rescue Insurance Product",
            key: 3,
            url: `${cycleRescueIpid1stJan2025}`,
          },
          {
            title: "Cycle Rescue Policy Wording",
            key: 4,
            url: `${Policy_Wording_Booklet_Web_jan25}`,
          },
          {
            title: "Terms of Business",
            key: 5,
            url: `${TOBv4}`,
          },
        ],
      },
      {
        id: 3,
        header:
          "Velosure policies purchased between 1st January 2025 and 31st May 2025",
        docs: [
          {
            title: "Velosure Performance Insurance Product",
            key: 0,
            url: `${VELO002CycleInsurancePolicySchedule}`,
          },
          {
            title: "Velosure Core Insurance Product",
            key: 1,
            url: `${VELO002CoreCycleInsurancePolicySchedule}`,
          },
          {
            title: "Velosure Policy Wording",
            key: 2,
            url: `${Policy_Wording_Booklet_Web_March15}`,
          },
          {
            title: "Cycle Rescue Insurance Product",
            key: 3,
            url: `${cycleRescueIpid1stJan2025}`,
          },
          {
            title: "Cycle Rescue Policy Wording",
            key: 4,
            url: `${Policy_Wording_Booklet_Web_jan25}`,
          },
          {
            title: "Terms of Business",
            key: 5,
            url: `${TOBv3}`,
          },
        ],
      }
    ],
  };
};

export default DocumentData;
