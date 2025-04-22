import { FormReviewType } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectorStatusProps = {
  status: string;
  handleChange: (name: keyof FormReviewType, value: string | number) => void;
};

export default function SelectorStatus({
  status,
  handleChange,
}: SelectorStatusProps) {
  return (
    <Select
      onValueChange={(value) => handleChange("status", value)}
      value={status}
    >
      <SelectTrigger className="w-[180px] border-[#242b38] border-3">
        <SelectValue defaultValue={status} />
      </SelectTrigger>
      <SelectContent className="text-[#e4e6eb] bg-[#1c1f26] border-[#292e38] border-2">
        <SelectGroup>
          <SelectLabel className="font-bold">Status</SelectLabel>
          <SelectItem value="completed">Have read</SelectItem>
          <SelectItem value="reading">Reading now</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
