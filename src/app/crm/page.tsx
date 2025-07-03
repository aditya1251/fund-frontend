import LeadOverview from "@/components/crm/leads";
import Statistics from "@/components/crm/statistics";
import Banks from "@/components/crm/banks";
import Testimonials from "@/components/crm/testimonials";
import Footer from "@/components/crm/footer";

export default function Page() {
	return (
		<>
			<LeadOverview />
			<Statistics />
			<Banks />
			<Testimonials />
			<Footer />
		</>
	);
}
