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
}

export default function GeneratedDataTable({ generatedData }: Props) {
  return (
    <Table>
      <TableHeader className="border border-zinc-700">
        <TableRow>
          {Object.keys(generatedData[0]).map((key) => (
            <TableHead
              className="border border-zinc-700 text-md font-bold text-white"
              key={key}
            >
              {key[0].toUpperCase() + key.slice(1, key.length)}
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
