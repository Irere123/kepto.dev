import { CheckAuth } from "./_components/CheckAuth";

function LandingPage() {
  return (
    <CheckAuth>
      <div>
        <p>Hello world</p>
      </div>
    </CheckAuth>
  );
}

export default LandingPage;
