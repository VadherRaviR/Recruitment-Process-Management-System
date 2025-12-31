import React from "react";


export default function SkillSelector({ skills, selected, onAdd, onRemove }) {
  const [sel, setSel] = React.useState("");
  const [weight, setWeight] = React.useState(3);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <select className="border p-2 rounded flex-1" value={sel} onChange={e=>setSel(e.target.value)}>
          <option value="">Select skill</option>
          {skills.map(s => <option key={s.skillId} value={s.skillId}>{s.name}</option>)}
        </select>

        <select className="border p-2 rounded w-32" value={weight} onChange={e=>setWeight(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>

        <button
          type="button"
          onClick={() => {
            if (!sel) return;
            onAdd(Number(sel), Number(weight));
            setSel("");
            setWeight(3);
          }}
          className="px-3 bg-indigo-600 text-white rounded"
        >
          Add
        </button>
      </div>

      <div>
        {selected && selected.length === 0 && (<div className="text-sm text-gray-500">No skills added</div>)}
        {selected && selected.length > 0 && (
          <ul className="space-y-1">
            {selected.map((it, i) => {
              const s = skills.find(x => x.skillId === it.skillId);
              return (
                <li key={i} className="flex justify-between items-center border rounded p-2">
                  <div>
                    <div className="font-medium">{s ? s.name : 'Skill '+it.skillId}</div>
                    <div className="text-xs text-gray-500">Weightage: {it.weightage}</div>
                  </div>
                  <button type="button" onClick={()=>onRemove(i)} className="text-red-600">Remove</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
