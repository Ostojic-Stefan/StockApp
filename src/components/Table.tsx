import { Structure } from "../types";

interface Props {
  data: Structure[] | Structure;
  onRowSelect?: (structure: Structure) => void;
  ignoreColumns?: string[];
}

function Table({ data, onRowSelect, ignoreColumns }: Props) {
  function renderRow(structure: Structure) {
    return (
      <tr key={structure.name}>
         {!ignoreColumns?.includes('name') && <td className="pair-name">
          <span className="symbol-name" onClick={() => onRowSelect?.(structure)}>{structure.name}</span>
        </td>}
        {!ignoreColumns?.includes('last') && <td>{structure.last}</td>}
        {!ignoreColumns?.includes('change') && <td>{structure.change}</td>}
        {!ignoreColumns?.includes('changeRelative') && <td>{structure.changeRelative}</td>}
        {!ignoreColumns?.includes('high') && <td>{structure.high}</td>}
        {!ignoreColumns?.includes('low') && <td>{structure.low}</td>}
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          {!ignoreColumns?.includes('name') && <th>Name</th>}
          {!ignoreColumns?.includes('last') && <th>Last Price</th>}
          {!ignoreColumns?.includes('change') && <th>Change</th>}
          {!ignoreColumns?.includes('changeRelative') && <th>Change Percent</th>}
          {!ignoreColumns?.includes('high') && <th>High</th>}
          {!ignoreColumns?.includes('low') && <th>Low</th>}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) ? data.map(renderRow) : renderRow(data)}
      </tbody>
    </table>
  );
}

export default Table;
