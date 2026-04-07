import { auth } from "@clerk/nextjs/server";
import { PLANS, PlanType } from "@/lib/subscription-constants";

export const getUserPlan = async (): Promise<PlanType> => {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        return PLANS.FREE;
    }

    // 1. Check from session claims (public metadata is often cached here)
    const metadata = sessionClaims?.metadata as { plan?: string; billingPlan?: string } | undefined;
    const planFromMetadata = (metadata?.plan || metadata?.billingPlan)?.toLowerCase();

    if (planFromMetadata === 'pro') return PLANS.PRO;
    if (planFromMetadata === 'standard') return PLANS.STANDARD;

    return PLANS.FREE;
};
