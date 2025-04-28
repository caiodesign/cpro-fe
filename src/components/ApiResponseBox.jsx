export default function ApiResponseBox({ response }) {
  return (
    <div className={`mt-6 w-full max-w-md p-4 rounded ${response.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {response.message}
    </div>
  );
}
