import { MarketingLayout } from "~/ui/layouts/MarketingLayout";
import { CheckAuth } from "./_components/CheckAuth";
import { Hero } from "~/ui/marketing/hero";

function LandingPage() {
  return (
    <CheckAuth>
      <MarketingLayout>
        <div className="grid gap-8">
          <Hero />
        </div>
      </MarketingLayout>
    </CheckAuth>
  );
}

export default LandingPage;
