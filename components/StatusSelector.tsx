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
      <SelectTrigger className="w-[180px]">
        <SelectValue defaultValue={status} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="font-bold">Status</SelectLabel>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="reading">Reading</SelectItem>
          <SelectItem value="dropped">Dropped</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
