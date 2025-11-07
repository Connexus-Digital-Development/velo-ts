import { Accordion } from "@mantine/core";
import type { QuestionProps } from "@/models/MarketingComponentTypes";

const Question = (props: QuestionProps) => {
  return (
    <div className=" oh">
      <Accordion variant="separated" radius="lg">
        {props.filteredData.map((row) => (
          <Accordion.Item value={row.question}>
            <Accordion.Control>
              <h4 className="FAQ">{row.question}</h4>
            </Accordion.Control>
            <Accordion.Panel>
              <div
                className={"mt-3"}
                dangerouslySetInnerHTML={{ __html: row.answer }}
              />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Question;
