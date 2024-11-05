export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'calculate' : IDL.Func(
        [IDL.Float64, IDL.Text, IDL.Float64],
        [IDL.Float64],
        [],
      ),
    'getLastResult' : IDL.Func([], [IDL.Float64], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
