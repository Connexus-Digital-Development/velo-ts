import GenericMessagePage from "@/components/shared/GenericMessagePage";

const InceptFailed = () => {
  return (
    <GenericMessagePage
      message={
        "Something went wrong incepting your policy. Payment may have already been taken. Please contact the call centre on 0800 083 3035 to resolve the issue."
      }
    />
  );
};

export default InceptFailed;
