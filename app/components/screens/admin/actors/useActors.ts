import { useRouter } from "next/router";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { useDebounce } from "@/hooks/useDebounce";

import { ActorService } from "@/services/actor.service";

import { convertMongoDate } from "@/utils/date/ConvertMongoDate";

import { getAdminUrl } from "@/config/url.config";

import { toastError } from "../../../../utils/toast-error";
import { ITableItem } from "../../../ui/admin-table/AdminTable/admin-table.interface";

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		["actor list", debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }: any) =>
				data.map(
					(actor: any): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`/actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				toastError(error, "actor list");
			},
		}
	);

	const { push } = useRouter();

	const { mutateAsync: createAsync } = useMutation(
		"create actor",
		() => ActorService.create(),
		{
			onError: (error) => {
				toastError(error, "Create actor");
			},
			onSuccess: ({ data: _id }) => {
				toastr.success("Create actor", "actor created successfully");
				push(getAdminUrl(`/actor/edit/${_id}`));
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		"delete actor",
		(actorId: string) => ActorService.deleteActor(actorId),
		{
			onError: (error) => {
				toastError(error, "Delete actor");
			},
			onSuccess: () => {
				toastr.success("Delete actor", "actor deleted successfully");
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
