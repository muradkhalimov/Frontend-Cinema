import { useRouter } from "next/router";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { useDebounce } from "@/hooks/useDebounce";

import { MovieService } from "@/services/movie.service";

import { getGenresList } from "@/utils/movie/getGenresList";

import { getAdminUrl } from "@/config/url.config";

import { toastError } from "../../../../utils/toast-error";
import { ITableItem } from "../../../ui/admin-table/AdminTable/admin-table.interface";

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		["movie list", debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }: any) =>
				data.map(
					(movie: any): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError: (error) => {
				toastError(error, "movie list");
			},
		}
	);

	const { push } = useRouter();

	const { mutateAsync: createAsync } = useMutation(
		"create movie",
		() => MovieService.create(),
		{
			onError: (error) => {
				toastError(error, "Create movie");
			},
			onSuccess: ({ data: _id }) => {
				toastr.success("Create movie", "movie created successfully");
				push(getAdminUrl(`/movie/edit/${_id}`));
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		"delete movie",
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onError: (error) => {
				toastError(error, "Delete movie");
			},
			onSuccess: () => {
				toastr.success("Delete movie", "movie deleted successfully");
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
