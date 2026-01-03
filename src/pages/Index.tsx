import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import WardrobeGallery from "@/components/wardrobe/WardrobeGallery";
import OutfitCanvas from "@/components/wardrobe/OutfitCanvas";
import UploadDialog from "@/components/wardrobe/UploadDialog";
import CategoryFilter from "@/components/wardrobe/CategoryFilter";

export type ClothingItem = {
  id: string;
  image: string;
  category: "tops" | "bottoms" | "shoes" | "accessories";
  name: string;
};

export type Outfit = {
  id: string;
  name: string;
  items: ClothingItem[];
  createdAt: Date;
};

const Index = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState<ClothingItem[]>([]);

  const handleUpload = (files: File[], category: ClothingItem["category"]) => {
    const newItems = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      image: URL.createObjectURL(file),
      category,
      name: file.name,
    }));
    setItems([...items, ...newItems]);
  };

  const handleAddToOutfit = (item: ClothingItem) => {
    if (!currentOutfit.find((i) => i.id === item.id)) {
      setCurrentOutfit([...currentOutfit, item]);
    }
  };

  const handleRemoveFromOutfit = (itemId: string) => {
    setCurrentOutfit(currentOutfit.filter((i) => i.id !== itemId));
  };

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-warm flex items-center justify-center shadow-soft">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">StyleBoard</h1>
                <p className="text-sm text-muted-foreground">Your digital wardrobe</p>
              </div>
            </div>
            <Button
              onClick={() => setUploadOpen(true)}
              className="bg-gradient-warm hover:opacity-90 transition-opacity shadow-soft"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Items
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Main Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">My Wardrobe</h2>
                <p className="text-muted-foreground mt-1">
                  {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
                </p>
              </div>
              <CategoryFilter
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            <WardrobeGallery items={filteredItems} onAddToOutfit={handleAddToOutfit} />
          </div>

          {/* Outfit Canvas Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit animate-slide-up">
            <OutfitCanvas
              items={currentOutfit}
              onRemoveItem={handleRemoveFromOutfit}
              onClear={() => setCurrentOutfit([])}
            />
          </div>
        </div>
      </div>

      <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default Index;
