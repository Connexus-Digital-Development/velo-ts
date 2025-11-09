import Question from "./Question";
import { useState, useMemo } from "react";
import Spinner from "@/components/shared/Spinner";
import { useFAQs, useCategories } from "@/hooks/queries/useContent";

interface FAQItem {
  id: number;
  category: {
    id: number;
    name: string;
  };
  // Add other FAQ properties as needed
  [key: string]: any;
}

interface CategoryItem {
  id: number;
  name: string;
  // Add other category properties as needed
  [key: string]: any;
}

// interface StructuredDataItem {
//   name: string;
//   faqs: FAQItem[];
// }

const FAQSection = () => {
  const brand = import.meta.env.VITE_CONNEXUS_BRAND;
  const faqCategoryType = import.meta.env.VITE_FAQS_CATEGORY_TYPE;

  const {
    data: faqsResponse,
    isLoading: faqsLoading,
    error: faqsError,
  } = useFAQs(brand);
  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories(faqCategoryType);

  const faqs = useMemo(() => faqsResponse?.Value || [], [faqsResponse]);
  const categories = useMemo(
    () => categoriesResponse?.Value || [],
    [categoriesResponse],
  );

  const hasApiError =
    faqsError ||
    categoriesError ||
    (faqsResponse && !faqsResponse.Success) ||
    (categoriesResponse && !categoriesResponse.Success);

  const structuredData = useMemo(() => {
    if (!faqs.length || !categories.length) return [];

    const result = categories.map((category: CategoryItem) => {
      const filteredFaqs = faqs.filter(
        (faq: FAQItem) => faq.category.id === category.id,
      );
      return { name: category.name, faqs: filteredFaqs };
    });

    return result;
  }, [faqs, categories]);

  const [activeCategory, setActiveCategory] = useState(0);

  const filteredData = structuredData[activeCategory]?.faqs || [];

  const handleCategoryFilterChange = (index: number) => {
    setActiveCategory(index);
  };

  if (faqsLoading || categoriesLoading) {
    return (
      <div className="container my-5 py-5 text-center ">
        {" "}
        <h4>
          {" "}
          <Spinner colour="velo-blue" /> Loading the FAQs{" "}
        </h4>
      </div>
    );
  }

  if (hasApiError) {
    return (
      <div className="container my-5 py-5 text-center">
        <h4>Error loading FAQs. Please try again later.</h4>
      </div>
    );
  }

  return (
    <div className="container mt-sm-5 mt-3 mb-5 oh ">
      <div className="row ">
        {structuredData.map((object, index) => {
          return (
            <div className="col-3 col-md-2 mb-sm-5 mb-3" key={index}>
              <button
                className={
                  index === activeCategory
                    ? "btn btn-seconday  primaryFocussed filterBlogButton"
                    : "btn btn-white  filterBlogButton"
                }
                onClick={() => handleCategoryFilterChange(index)}
              >
                {object.name}
              </button>
            </div>
          );
        })}
      </div>

      <Question filteredData={filteredData} />
    </div>
  );
};

export default FAQSection;
