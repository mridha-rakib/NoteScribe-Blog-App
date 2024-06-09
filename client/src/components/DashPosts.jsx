import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";

const DashPosts = () => {
  return (
    <div className="table-auto overflow-x-scroll md:max-auto p-3 scrollbar-track-late-100 scrollbar-thumb-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit</span>
          </Table.HeadCell>
        </Table.Head>
      </Table>
    </div>
  );
};

export default DashPosts;
