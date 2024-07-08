"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableHeadCellFilterContainer,
} from "material-react-table";
import { Box, Stack, Paper, useMediaQuery } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { data, type Product } from "./Data";

const Example = () => {
  const isMobile = useMediaQuery("(max-width: 1000px)");

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
        filterVariant: "autocomplete", // Example of a custom filter
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Subcategory",
        accessorKey: "subcategory",
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        filterVariant: "date-range", // Custom filter variant for date range
        filterFn: "betweenInclusive", // Filter function for range inclusive
        muiFilterDatePickerProps: {
          // Date picker specific props
          label: "Select Date Range",
        },
      },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
        filterVariant: "date-range",
        filterFn: "betweenInclusive",
        muiFilterDatePickerProps: {
          label: "Select Date Range",
        },
      },
      {
        header: "Price",
        accessorKey: "price",
        filterVariant: "range-slider", // Custom filter variant for range slider
        filterFn: "betweenInclusive", // Filter function for range inclusive
        muiFilterSliderProps: {
          // Slider specific props
          marks: true,
          max: 199, // Custom max value
          min: 0, // Custom min value
          step: 1,
          valueLabelFormat: (value) =>
            value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }),
        },
      },
      {
        header: "Sale Price",
        accessorKey: "sale_price",
        filterVariant: "range-slider",
        filterFn: "betweenInclusive",
        muiFilterSliderProps: {
          marks: true,
          max: 200, // Custom max value
          min: 0, // Custom min value
          step: 1,
          valueLabelFormat: (value) =>
            value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }),
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: "custom", // Use custom filter display mode
    enableGrouping: true,
    enableColumnResizing: true,
    groupedColumnMode: "remove",
    initialState: {
      density: "compact",
      expanded: true,
      grouping: ["category", "subcategory"],
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: "category", desc: false }],
    },
    muiFilterTextFieldProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`,
    }),
    muiFilterDatePickerProps: {
      // Date picker specific props
      // ... (add any default props for date picker here)
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction={isMobile ? "column-reverse" : "row"} gap="8px">
        <MaterialReactTable table={table} />
        <Paper>
          <Stack p="8px" gap="8px">
            {table.getLeafHeaders().map((header) => (
              <MRT_TableHeadCellFilterContainer
                key={header.id}
                header={header}
                table={table}
              />
            ))}
          </Stack>
        </Paper>
      </Stack>
    </LocalizationProvider>
  );
};

export default Example;
