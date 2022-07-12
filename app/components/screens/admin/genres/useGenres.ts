import { useRouter } from "next/router";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { useDebounce } from "@/hooks/useDebounce";

import { GenreService } from "@/services/genre.service";

import { getAdminUrl } from "@/config/url.config";

import { toastError } from "../../../../utils/toast-error";
import { ITableItem } from "../../../ui/admin-table/AdminTable/admin-table.interface";

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		["genre list", debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }: any) =>
				data.map(
					(genre: any): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`/genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError: (error) => {
				toastError(error, "genre list");
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { push } = useRouter();

	const { mutateAsync: createAsync } = useMutation(
		"create genre",
		() => GenreService.create(),
		{
			onError: (error) => {
				toastError(error, "Create genre");
			},
			onSuccess: ({ data: _id }) => {
				toastr.success("Create genre", "genre created successfully");
				push(getAdminUrl(`/genre/edit/${_id}`));
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		"delete genre",
		(genreId: string) => GenreService.delete(genreId),
		{
			onError: (error) => {
				toastError(error, "Delete genre");
			},
			onSuccess: () => {
				toastr.success("Delete genre", "genre deleted successfully");
				queryData.refetch();
			},
		}
	);
	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	);
};
