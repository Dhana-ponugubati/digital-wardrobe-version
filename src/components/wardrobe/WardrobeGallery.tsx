import { ClothingItem } from "@/pages/Index";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface WardrobeGalleryProps {
  items: ClothingItem[];
  onAddToOutfit: (item: ClothingItem) => void;
}

const WardrobeGallery = ({ items, onAddToOutfit }: WardrobeGalleryProps) => {
  if (items.length === 0) {
    return (
      <Card className="p-12 text-center border-dashed border-2 border-border bg-card/50">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center">
            <Plus className="w-8 h-8 text-accent-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">No items yet</h3>
          <p className="text-muted-foreground">
            Start building your digital wardrobe by uploading your first clothing items.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <Card
          key={item.id}
          className="group overflow-hidden bg-card border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="aspect-square relative overflow-hidden bg-accent/20">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Button
              size="sm"
              onClick={() => onAddToOutfit(item)}
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary hover:bg-primary/90 shadow-elevated"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="p-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {item.category}
            </p>
            <p className="text-sm font-medium text-foreground truncate mt-1">
              {item.name}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WardrobeGallery;
