export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-blue-600">404</span>
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
      </div>
    </div>
  );
};
