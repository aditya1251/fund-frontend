"use client";

import TemplateBuilder from "../features/templateBuilder";

export default function Page() {
	const FIXED_TEMPLATE_ID = "6885fc055d73e6b0d50b5b24";

	return (
		<TemplateBuilder
			fixedTemplateId={FIXED_TEMPLATE_ID}
			templateType="Taxation"
		/>
	);
}
