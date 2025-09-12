import * as Dialog from "@radix-ui/react-dialog";

interface FavoritesDrawerProps {
  favorites: string[];
  onSelect: (city: string) => void;
}

export default function FavoritesDrawer({ favorites, onSelect }: FavoritesDrawerProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="p-2 rounded bg-gray-700 text-white">☰</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 p-6 shadow-xl">
          <h2 className="text-lg font-bold mb-4">⭐ Favoritos</h2>
          <ul className="space-y-2">
            {favorites.map((city, i) => (
              <li key={i}>
                <button
                  onClick={() => onSelect(city)}
                  className="w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>
          <Dialog.Close className="absolute top-3 right-3">✖</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
