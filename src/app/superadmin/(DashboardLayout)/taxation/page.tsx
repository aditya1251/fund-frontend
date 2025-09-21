"use client";

import TemplateBuilder from "../features/templateBuilder";

export default function Page() {
	const FIXED_TEMPLATE_ID = "N";

	return (
		<TemplateBuilder
			fixedTemplateId={FIXED_TEMPLATE_ID}
			templateType="Taxation"
		/>
	);
}
