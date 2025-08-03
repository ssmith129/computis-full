@@ .. @@
        <Header onWorkflowOpen={handleWorkflowOpen} />
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        
-        <main className={`${activeWorkflow ? 'ml-0 pt-0 flex items-center justify-center' : 'ml-48 pt-12'} min-h-screen transition-all duration-200`}>
+        <main className={`${activeWorkflow ? 'ml-0 pt-0 flex items-center justify-center' : 'pt-12 min-h-screen transition-all duration-200'} min-h-screen transition-all duration-200`} style={{ marginLeft: activeWorkflow ? '0' : '234px' }}>
          <div className={`${activeWorkflow ? 'w-full' : 'content-container'}`}>
            {renderContent()}
          </div>
        </main>