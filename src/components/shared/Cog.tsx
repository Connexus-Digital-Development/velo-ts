import CogIcon from "@/assets/svgs/cog-icon.svg?url";

interface CogProps {
  rotate?: boolean;
}

const Cog = ({ rotate }: CogProps) => {
  return (
    <div className="cogContainer">
      <img
        src={CogIcon}
        alt="Cog icon"
        style={
          {
            "--cog-fill-color": rotate ? "#ddd" : "#33b9ff",
          } as React.CSSProperties
        }
        className={rotate ? "rotate" : ""}
      />
    </div>
  );
};

export default Cog;
