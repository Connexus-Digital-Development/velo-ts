import Question from "./Question";
import { useEffect, useState } from "react";
import Spinner from "@/components/shared/Spinner";

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

interface StructuredDataItem {
  name: string;
  faqs: FAQItem[];
}

const FAQSection = () => {
  const [structuredData, setStructuredData] = useState<StructuredDataItem[]>(
    [],
  );
  const [filteredData, setFilteredData] = useState<FAQItem[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateAndDefaultData();
  }, []);

  const generateAndDefaultData = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-API-KEY": import.meta.env.VITE_VELOSURE_API_KEY,
        "content-type": "application/json",
      },
    };
    const categories = await fetch(
      `${import.meta.env.VITE_VELOSURE_API_URL}/api/ConnexusCMS/Categories/GetCategoriesByType/${import.meta.env.VITE_FAQS_CATEGORY_TYPE}`,
      options,
    )
      .then((response) => response.json())
      .then((data) => data);
    const faqs = await fetch(
      `${import.meta.env.VITE_VELOSURE_API_URL}/api/ConnexusCMS/FAQs/GetFAQs/${import.meta.env.VITE_CONNEXUS_BRAND}`,
      options,
    )
      .then((response) => response.json())
      .then((data) => data);

    categories.forEach((category: CategoryItem) => {
      const filteredFaqs = faqs.filter(
        (faq: FAQItem) => faq.category.id === category.id,
      );
      setStructuredData((prevState: StructuredDataItem[]) => [
        ...prevState,
        { name: category.name, faqs: filteredFaqs },
      ]);
    });

    // Default to show all
    setActiveCategory(0);
    setFilteredData(
      faqs.filter((faq: FAQItem) => faq.category.id === categories[0].id),
    );
    setLoading(false);
  };

  const handleCategoryFilterChange = (index: number) => {
    setActiveCategory(index);
    setFilteredData((structuredData[index] as any).faqs);
  };

  if (loading)
    return (
      <div className="container my-5 py-5 text-center ">
        {" "}
        <h4>
          {" "}
          <Spinner colour="velo-blue" /> Loading the FAQs{" "}
        </h4>
      </div>
    );

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
