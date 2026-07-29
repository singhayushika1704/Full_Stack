export const fetchMockPosts = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: '1', title: 'Understanding Redux', content: 'Global state is powerful.', platformId: 'p1' },
        { id: '2', title: 'React Hooks', content: 'useState and useEffect.', platformId: 'p2' },
      ]);
    }, 1000)
  );
};