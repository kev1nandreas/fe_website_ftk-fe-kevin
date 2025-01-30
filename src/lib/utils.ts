import { type ClassValue, clsx } from "clsx";
import { Slide, toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const warnToast = (message: string): void => {
  toast.warn(message, {
	position: "top-right",
	autoClose: 4000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
	transition: Slide,
  });
}

export const errorToast = (message: string): void => {
  toast.error(message, {
	position: "top-right",
	autoClose: 4000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
	transition: Slide,
  });
}

export const successToast = (message: string): void => {
  toast.success(message, {
	position: "top-right",
	autoClose: 4000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
	transition: Slide,
  });
}

export const parseDate = (dateString: string): string => {
	const now = new Date();
	const date = new Date(dateString);

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

	return date.toDateString();
}