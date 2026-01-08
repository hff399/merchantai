import { Suspense } from "react";
import LeadsClient from "./LeadsClient";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <LeadsClient />
    </Suspense>
  );
}