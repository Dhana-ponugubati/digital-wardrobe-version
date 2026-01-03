import { ClothingItem } from "@/pages/Index";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface OutfitCanvasProps {
  items: ClothingItem[];
  onRemoveItem: (itemId: string) => void;
  onClear: () => void;
}

const OutfitCanvas = ({ items, onRemoveItem, onClear }: OutfitCanvasProps) => {
  const handleSave = () => {
    if (items.length === 0) {
      toast.error("Add some items to create an outfit");
      return;
    }
    toast.success("Outfit saved successfully!");
  };

  return (
    <Card className="p-6 bg-card border-border shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Today's Outfit</h3>
        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-border rounded-xl bg-accent/5">
          <p className="text-muted-foreground text-sm">
            Click "Add" on items to start creating your outfit
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="overflow-hidden bg-accent/5 border-border hover:border-primary/50 transition-colors">
                <div className="flex gap-3 p-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-accent/20 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {item.category}
                    </p>
                    <p className="text-sm font-medium text-foreground truncate mt-1">
                      {item.name}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <Button
          onClick={handleSave}
          className="w-full mt-6 bg-gradient-warm hover:opacity-90 transition-opacity shadow-soft"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Outfit
        </Button>
      )}
    </Card>
  );
};

export default OutfitCanvas;
