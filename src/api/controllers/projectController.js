const config = require('../../../config/appConfig');
const { createClient } = require('@supabase/supabase-js');

class ProjectController {
  static async getProject(req, res) {
    const { projectCode } = req.params;
    const supabase = createClient(config.supabase.url, config.supabase.serviceKey);
    try {
      const { data, error } = await supabase.from('projects').select().eq('shareCode', projectCode);

      if (data.length > 0) {
        return res.status(200).json(data[0]);
      } else {
        return res.status(404).json({ error: 'Project not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ProjectController;
