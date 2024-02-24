const config = require('../../../config/appConfig');
const { createClient } = require('@supabase/supabase-js');

class CodeController {
  static async getCode(req, res) {
    const { code } = req.params;
    const supabase = createClient(config.supabase.url, config.supabase.serviceKey);
    try {
      const { data, error } = await supabase.from('codes').select('code').eq('code', code);

      if (data.length > 0) {
        return res.status(200).json({ success: 'Code exists' });
      } else {
        return res.status(404).json({ error: 'Code not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = CodeController;
