import { useQuery } from "react-query";

import { IOption } from "@/components/ui/select/select.interface";

import { GenreService } from "@/services/genre.service";

import { toastError } from "@/utils/toast-error";

export const useAdminGenres = () => {
	const queryData = useQuery("List of genre", () => GenreService.getAll(), {
		select: ({ data }: any) =>
			data.map(
				(genre: any): IOption => ({
					label: genre.name,
					value: genre._id,
				})
			),
		onError: (error) => {
			toastError(error, "actor list");
		},
	});

	return queryData;
};
