export default function Perk({ children, ...formik }) {
  return (
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
      <input type="checkbox" {...formik} />
      {children}
    </label>
  )
}