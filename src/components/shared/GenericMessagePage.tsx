import TopNavBar from "./TopNavBar";
import RegularBanner from "./RegularBanner";

interface GenericMessagePageProps {
  message: string;
}

const GenericMessagePage = ({message}: GenericMessagePageProps) => {
    return (
        <div className="pr oh">
            <TopNavBar theme={"white"} />
            <RegularBanner
                headlineLine1={"Your bike insurance quote"}
                headlineLine2={""}
                subheadlineLine1={"Tell us about you, your bike and cover you need."}
                subheadlineLine2={""}
                hasCTA={"false"}
                CTAText={"Get a quote"}
            />
            <section className="container container_narrow">
                <h4 className="content_section mt-3 mb-3">
                  {message}
                </h4>
            </section>
        </div>
    );
};

export default GenericMessagePage;