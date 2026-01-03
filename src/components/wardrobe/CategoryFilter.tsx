import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = [
  { value: "all", label: "All" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "shoes", label: "Shoes" },
  { value: "accessories", label: "Accessories" },
];

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat.value}
          variant={selected === cat.value ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(cat.value)}
          className={
            selected === cat.value
              ? "bg-gradient-warm hover:opacity-90 transition-opacity"
              : "hover:border-primary/50"
          }
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
