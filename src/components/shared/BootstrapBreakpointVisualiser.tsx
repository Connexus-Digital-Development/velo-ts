interface BootstrapBreakpointVisualiserProps {
  children: React.ReactNode;
  isVisible?: boolean;
}

const BootstrapBreakpointVisualiser = ({ children, isVisible }: BootstrapBreakpointVisualiserProps) => {
  return (
    <>
      {isVisible && (
        <div className="bootstrapHelper">
          <p className="d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none">
            mobile 576
          </p>
          <p className="d-none d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none">
            sm ≥576px
          </p>
          <p className="d-none d-sm-none d-md-block d-lg-none d-xl-none d-xxl-none">
            md ≥768px
          </p>
          <p className="d-none d-sm-none d-md-none d-lg-block d-xl-none d-xxl-none">
            lg ≥992px
          </p>
          <p className="d-none d-sm-none d-md-none d-lg-none d-xl-block d-xxl-none">
            xl ≥1200px
          </p>
          <p className="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-block">
            xxl ≥1400px
          </p>
        </div>
      )}
      {children}
    </>
  );
};

export default BootstrapBreakpointVisualiser;
