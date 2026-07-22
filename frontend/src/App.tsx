
function App() {
  return (
      <>
      <h1>Shop Sphere</h1>
      <p>{import.meta.env.VITE_APP_NAME}</p>
      <p>{import.meta.env.VITE_API_URL}</p>
      </>
  )
}
export default App;