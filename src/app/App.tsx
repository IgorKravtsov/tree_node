import React, { FC, Suspense } from "react";
import { MainPage } from "pages/Main";
import { Layout } from "widgets/Layout";

export const App: FC = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <Layout>
        <MainPage />
      </Layout>
    </Suspense>
  );
};
