import { SchemaField } from "@/lib/type";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";

interface Props {
  generatedData: Record<string, unknown>[];
  schema: SchemaField[];
}

export default function GeneratedDataTable({ schema, generatedData }: Props) {
  return (
    <Table>
      <TableHeader className="border border-zinc-700">
        <TableRow>
          {schema.map((el) => (
            <TableHead
              className="border border-zinc-700 text-md font-bold text-white"
              key={el.fieldName}
            >
              {el.fieldName}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="text-white/85">
        {generatedData.map((el, i) => (
          <TableRow key={i} className="odd:bg-zinc-900/50">
            {Object.values(el).map((objVal, j) => (
              <TableCell className="border border-zinc-700" key={j}>
                {String(objVal)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
