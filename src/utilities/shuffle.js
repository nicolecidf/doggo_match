const shuffle = () => {
  const assets = [
    { image: "/assets/luca.jpeg" },
    { image: "/assets/ella.png" },
    { image: "/assets/maya.jpeg" },
    { image: "/assets/stella.jpeg" },
    { image: "/assets/chunk.jpeg" },
    { image: "/assets/mila.jpeg" },
    { image: "/assets/coco.jpeg" },
    { image: "/assets/django.jpeg" },
  ];
  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
};

export default shuffle;
