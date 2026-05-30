import { Suspense } from "react";
import SearchResultsClient from "./SearchResultsClient";
import PageLoader from "@/components/ui/PageLoader";

export default function SearchPage() {
  return (
    <div className="page container">
      <Suspense fallback={<PageLoader />}>
        <SearchResultsClient />
      </Suspense>
    </div>
  );
}
