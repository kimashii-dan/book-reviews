import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReviewFormType } from "./ReviewForm";

type StatusSelectorProps = {
  status: string;
  handleChange: (name: keyof ReviewFormType, value: string | number) => void;
};

export default function StatusSelector({
  status,
  handleChange,
}: StatusSelectorProps) {
  return (
    <Select
      onValueChange={(value) => handleChange("status", value)}
      value={status}
    >
      <SelectTrigger className="w-[180px] border-[#242b38] border-3">
        <SelectValue defaultValue={status} />
      </SelectTrigger>
      <SelectContent className="bg-[#292e38]">
        <SelectGroup>
          <SelectLabel className="font-bold">Status</SelectLabel>
          <SelectItem value="completed">Have read</SelectItem>
          <SelectItem value="reading">Reading now</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
