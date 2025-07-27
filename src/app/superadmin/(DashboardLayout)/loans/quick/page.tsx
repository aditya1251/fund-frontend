"use client";

import TemplateBuilder from "../../features/templateBuilder";

export default function Page() {
	const FIXED_TEMPLATE_ID = "6885355c8298919446610fbb";

	return (
		<TemplateBuilder
			fixedTemplateId={FIXED_TEMPLATE_ID}
			templateType="Quick Loan"
		/>
	);
}
