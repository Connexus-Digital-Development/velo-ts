import cycleRescuePolicyWording1stMarch from "../../Documents/cycle-rescue-policy-wording-1st-march.pdf";
import Policy_Wording_Booklet_Web_March15 from "../../Documents/Policy_Wording_Booklet_Web_March15.pdf";
import cycleRescueIpid1stMarch from "../../Documents/velosure cycle rescue Policy Wording IPID.pdf";
import VELO002CoreCycleInsurancePolicySchedule from "../../Documents/VELO205 - CORE Velosure Insurance Product Information Document (IPID) TM V4.pdf";
import VELO002CycleInsurancePolicySchedule from "../../Documents/VELO205 - Velosure Insurance Product Information Document (IPID) TM V4.pdf";
import TOB from "../../Documents/VELO207 - Velosure Terms of Business TM.pdf";
import TOBv3 from "../../Documents/VELO207.-.Velosure.Terms.of.Business.TM.V3.pdf";
import cycleRescueIpid1stJan2025 from "../../Documents/Velosure.Cycle.Policy.IPID.pdf";
import Policy_Wording_Booklet_Web_jan25 from "../../Documents/Velosure.Policy.Wording.January.2025.pdf";


import VELO002PerfCycleInsurancePolicySchedule2025 from "../../Documents/VELO205.-.Chubb.Performance.Velosure.IPID.pdf"; 
import VELO002CoreCycleInsurancePolicySchedule2025 from "../../Documents/VELO205.-.Chubb.CORE.Velosure.IPID.pdf";
import Policy_Wording_Booklet_Web_2025 from "../../Documents/VELO206.-.Chubb.Velosure.Policy.Wording.digital.pdf";
import TOBv4 from "../../Documents/VELO207 - Chubb Velosure Terms of Business.pdf";

const DocumentData = () => {
  return {
    DocumentList: [
      {
        id: 0,
        header: "Velosure policies purchased on or after 1st June 2025",
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
        id: 1,
        header: "Velosure policies purchased between 1st January 2025 and 31st May 2025",
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
      },
      {
        id: 2,
        header: "Velosure policies purchased between 16th March 2023 and 31st December 2024",
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
            url: `${cycleRescueIpid1stMarch}`,
          },
          {
            title: "Cycle Rescue Policy Wording",
            key: 4,
            url: `${cycleRescuePolicyWording1stMarch}`,
          },
          {
            title: "Terms of Business",
            key: 5,
            url: `${TOB}`,
          },
        ],
      },
    ],
  };
};

export default DocumentData;
