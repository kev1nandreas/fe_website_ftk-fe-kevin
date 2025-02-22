import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseDate = (dateString: string): string => {
	const nowGMT = new Date();
	const dateGMT = new Date(dateString);

	const now = new Date(nowGMT.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
	const date = new Date(dateGMT.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));

	const diff = now.getDate() - date.getDate();
	const diffHours = now.getHours() - date.getHours();
	const diffMinutes = now.getMinutes() - date.getMinutes();

	if (diffHours <= 1) {
		return `${diffMinutes} menit yang lalu`;
	}
	if (diff <= 1) {
		return `${diffHours} jam yang lalu`;
	}
	if (diff < 7) {
		return `${diff} hari yang lalu`;
	}

	return date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

export const parseDateShort = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}