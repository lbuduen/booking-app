import { Field } from "formik"

export default function Perk(props) {
  return (
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
      <Field type="checkbox" name="perks" value={props.value} />
      {props.children}
    </label>
  )
}